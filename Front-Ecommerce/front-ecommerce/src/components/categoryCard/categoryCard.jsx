const CategoryCard = ({categoryName, categoryAvailable }) => {
    return (
        <p
            style={{
                margin: 0,
                padding: 0,
                color: categoryAvailable ? 'black' : 'red', // Texto en rojo si no está disponible
            }}
        >
            {categoryName} <br/> {!categoryAvailable && '(No Disponible)'}
        </p>
    );
};

export default CategoryCard;