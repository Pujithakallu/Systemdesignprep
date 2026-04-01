export default function VisualizerContainer({ title, children }) {
  return (
    <div className="my-8 border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 m-0">{title}</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>
      <div className="p-6 relative min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
