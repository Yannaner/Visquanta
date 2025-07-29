const { useEffect, useRef } = window.React;

const ChromaGrid = ({ 
  items = [], 
  columns = 3,
  gap = 32
}) => {
  const containerRef = useRef(null);

  const handleItemClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        gap: `${gap}px`,
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(item)}
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f8f8f8)',
            borderRadius: '16px',
            border: `3px solid ${item.borderColor || '#000000'}`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            color: '#000000',
            minHeight: '280px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.25)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {item.image && (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '3px solid #000000'
            }}>
              <img 
                src={item.image} 
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          
          {item.icon && (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #000000, #2a2a2a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              color: '#ffffff',
              fontSize: '2rem',
              border: '3px solid #333333',
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
            }}>
              {item.icon}
            </div>
          )}
          
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            margin: '0 0 12px 0',
            textAlign: 'center',
            color: '#000000',
            lineHeight: '1.3'
          }}>
            {item.title}
          </h3>
          
          <p style={{
            fontSize: '0.9rem',
            color: '#555555',
            textAlign: 'center',
            margin: '0 0 12px 0',
            lineHeight: '1.4',
            flex: 1
          }}>
            {item.subtitle}
          </p>
          
          {item.handle && (
            <span style={{
              fontSize: '0.8rem',
              color: '#777777',
              fontFamily: 'monospace',
              fontWeight: '600',
              background: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              {item.handle}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChromaGrid;
