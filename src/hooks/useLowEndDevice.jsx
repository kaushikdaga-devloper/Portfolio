import { useEffect } from 'react';

export const useLowEndDevice = () => {
  useEffect(() => {
    const deviceMemory = navigator.deviceMemory;
    const cpuCores = navigator.hardwareConcurrency;
    const hasLowMemory = typeof deviceMemory === 'number' && deviceMemory === 1;
    const hasLowCpu = typeof cpuCores === 'number' && cpuCores <= 2;

    document.body.classList.toggle('performance-low-end', hasLowMemory || hasLowCpu);

    return () => document.body.classList.remove('performance-low-end');
  }, []);
};