import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className=" text-xl font-semibold hover:text-gray-300 transition-colors">Spooky!</Link>
                </div>
                <div>
                    <Link href="/about" className="text-xl font-semibold hover:text-gray-300 transition-colors">🎃</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}