import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";

export default function Hero() {
  return (
    <div className="flex flex-row">
      <Left />
      <Middle />
      <Right />
    </div>
  );
}
