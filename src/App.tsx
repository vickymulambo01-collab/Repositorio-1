import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Solutions from '@/pages/Solutions'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
