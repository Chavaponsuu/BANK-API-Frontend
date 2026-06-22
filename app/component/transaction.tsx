import { InputUi } from "./inputUi";



export function Transaction() {

   function handleWithdraw(){
        
   }
  return (
    <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">New Transaction</h2>
        <p className="text-sm text-gray-600">Create a new transaction for your account</p>
      </div>

      <div className="space-y-4">
        <InputUi Label="ACCOUNT NUMBER" placeholder="Enter account number" />
        <InputUi Label="AMOUNT (฿)" placeholder="0.00" type="number" />
        <InputUi Label="DESCRIPTION" placeholder="Optional description" />

        <div className="flex gap-3 pt-4">
          <button className="flex-1 glass-card px-6 py-3 rounded-xl border border-white/30 
                           hover:bg-white/50 transition-all font-medium text-gray-700">
            Cancel
          </button>
          <button className="flex-1 bg-blue-500/80 backdrop-blur-md px-6 py-3 rounded-xl 
                           border border-blue-400/30 hover:bg-blue-600/80 transition-all 
                           font-medium text-white shadow-md">
            Create Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
