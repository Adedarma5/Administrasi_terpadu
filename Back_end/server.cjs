// server.cjs

(async () => {
    try {
      await import('./index.js');
    } catch (err) {
      console.error('Gagal menjalankan server:', err);
    }
  })();
  