'use client';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
    return (
        <form className="relative w-full max-w-3xl mx-auto mb-6" onSubmit={onSubmit}>
            <input
                type="search"
                placeholder="Search for articles, authors, or topics..."
                value={value}
                onChange={onChange}
                className="w-full p-4 pl-12 text-sm border rounded-lg bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
            />
            <button
                type="submit"
                className="absolute right-2.5 top-2.5 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600"
            >
                Search
            </button>
            <div className="absolute left-3 top-3 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a7 7 0 100 14A7 7 0 009 2zM1.293 9.707a1 1 0 010-1.414L8.293 1.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </form>
    );
};

export default SearchBar;
