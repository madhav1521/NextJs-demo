import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import FilterCosts from '../Components/FilterCosts';
import SearchCity from '../Components/SearchCity';
import { useRouter } from 'next/router';
import SortCities from '../Components/SortCities';
import ButtonIcons from '../Components/ButtonIcons';
// import UpdateForm from '../UpdateForm';
// import Favourite from '../favourite';
import Link from 'next/link';

function Tour() {
    const [toursData, setToursData] = useState([]);
    const [toursNewData, setToursNewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCost, setFilterCost] = useState('0');
    const [filteredData, setFilteredData] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favoriteData, setFavoriteData] = useState([]);

    const router = useRouter();

    // Favourites page =================================================================================================================

    const handleFavorite = (id) => {
        if (favorites.includes(id)) {
            // Item is already in favorites, remove it
            setFavorites(favorites.filter((itemId) => itemId !== id));
            setFavoriteData(favoriteData.filter((data) => data.id !== id));
        } else {
            // Item is not in favorites, add it
            setFavorites([...favorites, id]);
            const newData = filteredData.find((data) => data.id === id);
            if (newData) {
                setFavoriteData([...favoriteData, newData]);
                router.push({
                    pathname: '/favourite',
                    query: { favoriteData: JSON.stringify(favoriteData) },
                });
            }
            console.log('newData: ', newData)
        }
        console.log('fav: ', favorites.includes(id))
    };

    // Get data ==================================================================================================================

    useEffect(() => {
        const fetchToursData = async () => {
            try {
                const response = await fetch(`https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details.json`);
                if (!response.ok) {
                    console.log('Failed to fetch tours data.');
                    throw new Error('Failed to fetch data.');
                }
                const responseData = await response.json();

                const loadedTours = [];
                for (const key in responseData) {
                    if (responseData[key] && responseData[key].city) {
                        loadedTours.push({
                            id: key,
                            city: responseData[key].city,
                            description: responseData[key].description,
                            cost: responseData[key].cost,
                        });
                    }
                }
                setToursData(loadedTours);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchToursData();
    }, []);

    // Delete data ==================================================================================================================

    const onDeleteHandler = async (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete tour ${id}?`);
        if (confirmed) {
            try {
                await onDeleteTourData(id);
                console.log(`Tour ${id} successfully deleted.`);
            } catch (error) {
                console.log("Error deleting tour:", error);
            }
        }
    }
    const onDeleteTourData = async (id) => {
        try {
            const response = await fetch(`https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details/${id}.json`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("Failed to delete tour.");
            }
        } catch (error) {
            throw new Error("Error deleting tour:", error);
        }
    }

    // Edit/Update data ==================================================================================================================


    // const editHandler = async (id) => {
    //     const confirmed = window.confirm(`Are you sure you want to delete tour ${id}?`);
    //     if (confirmed) {
    //         try {
    //             await onEditHandler(id);
    //             console.log(`Tour ${id} successfully deleted.`);
    //         } catch (error) {
    //             console.log("Error deleting tour:", error);
    //         }
    //     }
    // }

    const handleEdit = async (id) => {
        try {
          const response = await fetch(
            `https://travel-and-tour-35872-default-rtdb.firebaseio.com/Tours-Details/${id}.json`
          );
          if (!response.ok) {
            console.log('Failed to update tour data.');
            throw new Error('Failed to update data.');
          }
          const responseData = await response.json();
          console.log('fetched data: ', responseData);
          const loadedTours = [];
          for (const key in responseData) {
            if (responseData[key] && responseData[key].city) {
                loadedTours.push({
                    id: key,
                    city: responseData[key].city,
                    description: responseData[key].description,
                    cost: responseData[key].cost,
                });
            }
        }
          const updatedTours = loadedTours.map((tour) =>
          tour.id === id
          ? {
              ...tour,
              city: responseData.city,
              description: responseData.description,
              cost: responseData.cost,
            }
            : tour
            );
            console.log('updatedTours data: ', updatedTours);
      
          router.push({
            pathname: `/updateForm`,
            query: {
              id: id,
              tours: JSON.stringify(updatedTours),
            },
          });
        } catch (error) {
          console.log('Error: ', error);
        }
      };
      


    // filter data ================================================================================================================== 

    useEffect(() => {
        const filterData = () => {
            let filteredItems = toursData;

            if (filterCost !== '0') {
                filteredItems = toursData.filter(item => {
                    if (filterCost === '1' && item.cost >= 1 && item.cost <= 2000) {
                        console.log('filter selection: ', filterCost)
                        return true;
                    } else if (filterCost === '2' && item.cost > 2000 && item.cost <= 5000) {
                        return true;
                    } else if (filterCost === '3' && item.cost > 5000 && item.cost <= 10000) {
                        return true;
                    } else if (filterCost === '4' && item.cost > 10000) {
                        return true;
                    }
                    return false;
                });
            }

            if (searchCity.trim() !== '') {
                filteredItems = filteredItems.filter(item =>
                    item.city.toLowerCase().includes(searchCity.toLowerCase())
                );
            }

            setFilteredData(filteredItems);
        };

        filterData();
    }, [toursData, filterCost, searchCity]);

    if (loading) {
        return <p className='loader'><CircularProgress /></p>
    }


    // sorted data ========================================================== 

    const { query } = router;

    const queryParams = new URLSearchParams(query);

    const isAscendingSorting = queryParams.get('sort') === 'asc';
    const sortedCity = sortCity(toursData, isAscendingSorting);

    const changeSortingHandler = () => {
        const newSortValue = isAscendingSorting ? 'desc' : 'asc';
        const newQuery = { ...query, sort: newSortValue };
        router.push({
            pathname: router.pathname,
            query: newQuery,
        });
    };

    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };

    const filterChangeHandler = selectedCost => {
        const newValue = selectedCost.target.value;
        setFilterCost(newValue);
    };

    const searchChangeHandler = searchCityProp => {
        const searchCityValue = searchCityProp.target.value;
        setSearchCity(searchCityValue);
    };

    return (
        <React.Fragment>
            <SortCities onClick={changeSortingHandler} sorting={isAscendingSorting} />
            <hr />
            <div className='tour'>
                <div className="tour-container">
                    <div className='div-container'>
                        <p>Hover over the specific component to delete or edit the tour fields </p>
                        {filteredData.length > 0 ? (
                            filteredData.map((data) => (
                                <div className='tour-icons-title' key={data.id} >
                                    <div
                                        className={`tour-title ${isHovered === data.id ? 'hovered' : 'not-hovered'}`}
                                        onMouseEnter={() => handleMouseEnter(data.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className='tour-Description'>
                                            <h2>{data.city}</h2>
                                            <p>{data.description}</p>
                                            <p>₹ {data.cost}</p>
                                            <button type='button' className='tour-btn' onClick={() => handleFavorite(data.id)}>
                                                {favorites.includes(data.id) ? 'Unfavorite' : 'Favorite'}
                                            </button>
                                        </div>
                                        <div className='button-shown'>
                                            {isHovered === data.id && <ButtonIcons onEdit={() => handleEdit(data.id)} onDelete={() => onDeleteHandler(data.id)} visible={isHovered === data.id} />}
                                        </div>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p className='loader'>No Tours available.. </p>
                        )}
                    </div>
                </div>
                <div>
                    <FilterCosts selected={filterCost} onChange={filterChangeHandler} />
                    <SearchCity selected={searchCity} onChange={searchChangeHandler} />
                </div>
            </div>
        </React.Fragment >
    )
};

export const sortCity = (cities, ascending = true) => {
    return cities.sort((a, b) => {
        if (ascending) {
            return a.city > b.city ? 1 : -1;
        }
        else {
            return a.city < b.city ? 1 : -1;
        }
    });
};

export default Tour;