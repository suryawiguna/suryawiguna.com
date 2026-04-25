export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="m-foot">
      <span>© {year} Surya Wiguna</span>
      <span>Bali, Indonesia</span>
    </footer>
  );
}
