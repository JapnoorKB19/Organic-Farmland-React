import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api/farmProductAPI';
import { useCart } from '../context/CartContext';
import MiniCart from '../components/common/MiniCart';
import { useAuth } from '../hooks/useAuth';



const BrowseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All', 'Vegetable', 'Fruit', 'Honey', 'Dairy']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);

        // Update categories dynamically
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const interval = setInterval(fetchProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = filter === 'All'
    ? products
    : products.filter((p) => p.category === filter);

  const muiStyles = {
    container: { padding: '32px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
    title: { fontSize: '2.125rem', fontWeight: 400, marginBottom: '16px', color: '#1976d2' },
    formControl: { marginBottom: '32px', minWidth: '200px' },
    select: {
      padding: '16.5px 14px', fontSize: '1rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      border: '1px solid #c4c4c4', borderRadius: '4px', backgroundColor: '#fff', minWidth: '200px', cursor: 'pointer'
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
    card: {
      backgroundColor: '#fff', borderRadius: '4px',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      overflow: 'hidden', transition: 'box-shadow 0.3s ease'
    },
    cardMedia: {
      height: '200px', backgroundSize: 'cover', backgroundPosition: 'center'
    },
    cardContent: { padding: '16px' },
    cardTitle: { fontSize: '1.25rem', fontWeight: 500, marginBottom: '8px', color: '#1976d2' },
    price: { fontSize: '1rem', color: '#666', marginBottom: '8px' },
    farmerInfo: { fontSize: '0.875rem', color: '#666', marginBottom: '4px' },
    cardActions: { padding: '8px 16px 16px 16px' },
    button: {
      backgroundColor: '#1976d2', color: '#fff', padding: '6px 16px', fontSize: '0.875rem', fontWeight: 500,
      border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', transition: 'background-color 0.3s ease'
    },
    loader: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' },
    spinner: {
      width: '40px', height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #1976d2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <div style={muiStyles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .card:hover {
            box-shadow: 0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12);
          }
          .button:hover {
            background-color: #1565c0;
          }
          .select:focus {
            outline: none;
            border-color: #1976d2;
          }
        `}
      </style>

      <h1 style={muiStyles.title}>Browse Products</h1>

      <div style={muiStyles.formControl}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '1rem', color: '#666' }}>
          Category
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={muiStyles.select}
          className="select"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={muiStyles.loader}>
          <div style={muiStyles.spinner}></div>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div style={muiStyles.grid}>
              {filteredProducts.map(product => {
                // Fix image URL for backslashes and prefix with backend URL
                const imageUrl = product.images?.[0]
                  ? `http://localhost:5000/${product.images[0].replace(/\\/g, '/')}`
                  : 'https://via.placeholder.com/300x200';

                return (
                  <div key={product._id} style={muiStyles.card} className="card">
                    <div
                      style={{
                        ...muiStyles.cardMedia,
                        backgroundImage: `url(${imageUrl})`
                      }}
                    />
                    <div style={muiStyles.cardContent}>
                      <h3 style={muiStyles.cardTitle}>{product.name}</h3>
                      <div style={muiStyles.price}>₹{product.price}</div>
                      <div style={muiStyles.farmerInfo}>👨‍🌾 {product.farmer?.name ?? 'Unknown'}</div>
                      <div style={muiStyles.farmerInfo}>📍 📍 {product.farmer?.location?.coordinates
    ? `Lat: ${product.farmer.location.coordinates[1]}, Lon: ${product.farmer.location.coordinates[0]}`
    : 'N/A'}</div>
                      <div style={muiStyles.farmerInfo}>📞 {product.farmer?.phone ?? 'N/A'}</div>
                      <div style={muiStyles.farmerInfo}>🏷️ {product.category}</div>
                    </div>
                    <div style={muiStyles.cardActions}>
                      <button
                        style={muiStyles.button}
                        className="button"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {user?.role === 'consumer' && <MiniCart />}
    </div>
  );
};

export default BrowseProducts;
