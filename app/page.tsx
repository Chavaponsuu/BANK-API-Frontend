import Header from "./component/header";
import Stat from "./component/stat";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#eef2ff' }}>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Header />

        <Stat/>

       

        {/* Main Content Area with Glassomorphism */}
        <div className="glass-card rounded-2xl p-5 shadow-md relative overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="glass-card p-4 rounded-2xl hover:bg-white/50 transition-all relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 backdrop-blur-sm" />
                    <div>
                      <p className="font-medium text-gray-900">Transaction #{item}234</p>
                      <p className="text-sm text-gray-700">2 hours ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">$1,{item}50.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
