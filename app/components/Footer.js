export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
                <p>© {new Date().getFullYear()} Hospital Monitoring System</p>
            </div>
        </footer>
    );
}
