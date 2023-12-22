export default function Table({ items, columns, primary, action }) {
    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-2 py-4">{primary}</th>
                    {columns.map((column) =>
                        <th key={column} scope="col" className="px-2 py-2">{column == 'description' ? 'Настройка' : 'Стойност'}</th>
                    )}
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) =>
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-2 py-4 font-medium  whitespace-nowrap dark:text-white">
                            #{item.id -1}
                        </th>
                        {columns.map((column) =>
                            <td key={column} className="px-2 py-4">
                                {item[column]}
                            </td>
                        )}
                        <td className="px-2 py-2">
                            <button type="button" onClick={(()=> action(item.id))} className="font-medium text-secondary dark:text-blue-500"> <i className="pi pi-pencil"></i></button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}