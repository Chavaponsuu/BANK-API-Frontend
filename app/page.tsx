import Header from "./component/header";
import Stat from "./component/stat";
import {Transaction  } from "./component/transaction";
import AccountList from "./component/accountList";
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#eef2ff' }}>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Header />

        <Stat/>
        <AccountList/>
        <Transaction/>


      </div>
    </div>
  );
}
