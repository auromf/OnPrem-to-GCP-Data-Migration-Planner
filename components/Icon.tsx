
import React from 'react';
import { IconName } from '../types';

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons: { [key in IconName]: React.ReactNode } = {
    oracle: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c5.52,0,10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M12,6c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6S15.31,6,12,6z M12,16c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,16,12,16z"/></svg>,
    mssql: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M5 2h14v2H5zM5 6h14v12H5zM7 8v8h10V8H7zm2 2h6v4H9v-4zM5 20h14v2H5z"/></svg>,
    postgres: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15V9h2v8h-2zm-3-4.5c0-.83.67-1.5 1.5-1.5H11V9H9.5C7.57 9 6 10.57 6 12.5S7.57 16 9.5 16H11v-1.5H9.5c-.83 0-1.5-.67-1.5-1.5zm6-1.5c0-.83.67-1.5 1.5-1.5H17V9h-1.5C13.57 9 12 10.57 12 12.5s1.57 3.5 3.5 3.5H17v-1.5h-1.5c-.83 0-1.5-.67-1.5-1.5z"/></svg>,
    mysql: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM10.2 17.5l-3.7-3.7 1.4-1.4 2.3 2.3 5.3-5.3 1.4 1.4-6.7 6.7z"/></svg>,
    teradata: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z M11,7h2v6h-2V7z M11,15h2v2h-2V15z"/></svg>,
    bigquery: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5L6 12l4.5-4.5 1.41 1.41L9.83 12l2.08 2.09L10.5 16.5zm5.5-1.09L14.08 12l2.09-2.09-1.41-1.41L10.5 12l4.24 4.24 1.67-1.83z" /></svg>,
    gcs: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>,
    cloudstorage: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>,
    dataflow: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M22 11.5c0-1.1-.9-2-2-2h-3.1l-2.4-4.8c-.3-.6-1-1-1.7-1H8.2c-.7 0-1.4.4-1.7 1L4.1 9.5H2c-1.1 0-2 .9-2 2s.9 2 2 2h2.2l1.6 3.2-1.6 3.2H2c-1.1 0-2 .9-2 2s.9 2 2 2h3.1l2.4 4.8c.3.6 1 1 1.7 1h6.6c.7 0 1.4-.4 1.7-1l2.4-4.8H20c1.1 0 2-.9 2-2s-.9-2-2-2h-2.2l-1.6-3.2 1.6-3.2H20c1.1 0 2-.9 2-2z"/></svg>,
    pubsub: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z"/></svg>,
    cloudsql: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>,
    composer: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H7v-2h3v2zm0-4H7v-2h3v2zm0-4H7V7h3v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>,
    logging: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 14H8v-2h8v2zm0-4H8v-2h8v2zm-4-4H8V6h4v2z"/></svg>,
    monitoring: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-6h2v6zm4 0h-2v-6h2v6z"/></svg>,
    datacatalog: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.5 4c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5H7.5c-.83 0-1.5-.67-1.5-1.5V11h-2V5.5c0-.83.67-1.5 1.5-1.5h14zM18 6h-8v12h8V6zm-6 2h4v2h-4V8zm0 4h4v2h-4v-2zm-4-4H4v4h4V8z"/></svg>,
    generic: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>,
    arrow: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" /></svg>,
  };

  return icons[name] || icons['generic'];
};

export default Icon;
