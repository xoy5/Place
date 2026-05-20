SELECT 'CREATE DATABASE place' 
WHERE NOT EXISTS (
  SELECT FROM pg_database WHERE datname = 'place'
)\gexec