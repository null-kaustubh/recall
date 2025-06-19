export default function Sidebar() {
  return (
    <div className="fixed min-h-screen bg-neutral-900 border-r border-neutral-800 w-72 left-0 top-0">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden ml-10 mt-4">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-full h-full object-cover scale-150 rotate-180 translate-y-0.5"
          />
        </div>
        <div>
          <h1 className="font-semibold text-3xl mt-4 ml-4">Recall</h1>
          <p className="font-extralight text-sm ml-4">your second brain</p>
        </div>
      </div>
    </div>
  );
}
