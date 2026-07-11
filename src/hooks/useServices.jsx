import { useCallback, useEffect, useState } from "react";
import axios from "axios";

/**
 * @typedef {Object} Service
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/api";

/** @type {Service[] | null} */
let cache = null;
let cacheTimestamp = 0;

const CACHE_TTL = 60_000; // 1 minute
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 800;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchServices = async (signal) => {
  const { data } = await axios.get(`${API_BASE}/services/all-services`, {
    signal,
  });
  return data;
};

export function useServices() {
  /** @type {[Service[], Function]} */
  const [services, setServices] = useState(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState("");
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const fetchWithRetry = useCallback(async (signal) => {
    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
      try {
        return await fetchServices(signal);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") throw err;

        attempt += 1;
        if (attempt > MAX_RETRIES) throw err;

        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    const loadServices = async () => {
      const isCacheFresh =
        cache !== null && Date.now() - cacheTimestamp < CACHE_TTL;

      if (isCacheFresh && refetchTrigger === 0) {
        if (!ignore) {
          setServices(cache);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await fetchWithRetry(controller.signal);
        if (ignore) return;

        if (data?.success) {
          const list = Array.isArray(data.services) ? data.services : [];
          cache = list;
          cacheTimestamp = Date.now();
          setServices(list);
        } else {
          setError(data?.message || "Failed to load services.");
        }
      } catch (err) {
        if (!ignore && err.name !== "CanceledError" && err.name !== "AbortError") {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch services. Please try again later.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [refetchTrigger, fetchWithRetry]);

  const retry = useCallback(() => setRefetchTrigger((n) => n + 1), []);

  return { services, loading, error, retry };
}