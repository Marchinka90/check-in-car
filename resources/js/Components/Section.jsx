export default function Section({ id, className = '', children, ...props }) {
  return (
    <>
      <section {...props} id={id} className={`w-full ${className}`}>
        {children}
      </section>
    </>
  );
}