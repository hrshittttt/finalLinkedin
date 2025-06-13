import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";
import Header from "./Header";

export default function Hero() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Left />
        <Middle />
        <Right />
      </div>
    </>
  );
}
