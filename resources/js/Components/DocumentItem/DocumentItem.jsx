export default function DocumentItem(props) {
  return (
    <p className="flex justify-start items-center font-lato text-primary text-2xl tracking-wide leading-relaxed mb-3">
      <span className={`text-secondary mr-2 ${props.iconClasses}`}>{props.icon}</span> 
      {props.title}
      </p>

  );
}
