SELECT 'CREATE DATABASE dezuredb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dezuredb');
