import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import videoApi from '~/api/video';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ComboBox() {
    const [input, setInput] = useState([]);
    const [search, setSearch] = useState();
    const [listHashTag, setListHashTag] = useState();



    useEffect(() => {
        videoApi.findHashTag(search)
            .then(res => {
                console.log("res: ", res.data);
                setListHashTag(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [search])

    const onTagsChange = (event, values) => {
        //   debugger;
        setInput(values);
    };
    const handler = () => {
        console.log(input);
    };

    const handleInputChange = (e) => {
        console.log("handleInputChange", e.target.value);
        let inputValue = e.target.value.split(" ").join('#');
        console.log("inputValue", inputValue);

        setSearch(e.target.value);

    }

    return [
        <input type="button" value="validate input" onClick={handler} />,
        <Autocomplete
            multiple
            freeSolo
            options={listHashTag}
            getOptionLabel={option => option.name || option}
            onChange={onTagsChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="HashTag"
                    placeholder="#"
                    margin="normal"
                    fullWidth
                    onChange={e => handleInputChange(e)}
                />
            )}
        />
    ];
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { name: "The Shawshank Redemption", view: 1994 },
    { name: "The Godfather", view: 1972 },
    { name: "The Godfather: Part II", view: 1974 },
    { name: "The Dark Knight", view: 2008 },
    { name: "12 Angry Men", view: 1957 },
    { name: "Schindler's List", view: 1993 },
    { name: "Pulp Fiction", view: 1994 },
    { name: "The Lord of the Rings: The Return of the King", view: 2003 },
    { name: "The Good, the Bad and the Ugly", view: 1966 },
    { name: "Fight Club", view: 1999 },
    { name: "The Lord of the Rings: The Fellowship of the Ring", view: 2001 },
    { name: "Star Wars: Episode V - The Empire Strikes Back", view: 1980 },
    { name: "Forrest Gump", view: 1994 },
    { name: "Inception", view: 2010 },
    { name: "The Lord of the Rings: The Two Towers", view: 2002 },
    { name: "One Flew Over the Cuckoo's Nest", view: 1975 },
    { name: "Goodfellas", view: 1990 },
    { name: "The Matrix", view: 1999 },
    { name: "Seven Samurai", view: 1954 },
    { name: "Star Wars: Episode IV - A New Hope", view: 1977 },
    { name: "City of God", view: 2002 },
    { name: "Se7en", view: 1995 },
    { name: "The Silence of the Lambs", view: 1991 },
    { name: "It's a Wonderful Life", view: 1946 },
    { name: "Life Is Beautiful", view: 1997 },
    { name: "The Usual Suspects", view: 1995 },
    { name: "Léon: The Professional", view: 1994 },
    { name: "Spirited Away", view: 2001 },
    { name: "Saving Private Ryan", view: 1998 },
    { name: "Once Upon a Time in the West", view: 1968 },
    { name: "American History X", view: 1998 },
    { name: "Interstellar", view: 2014 },
    { name: "Casablanca", view: 1942 },
    { name: "City Lights", view: 1931 },
    { name: "Psycho", view: 1960 },
    { name: "The Green Mile", view: 1999 },
    { name: "The Intouchables", view: 2011 },
    { name: "Modern Times", view: 1936 },
    { name: "Raiders of the Lost Ark", view: 1981 },
    { name: "Rear Window", view: 1954 },
    { name: "The Pianist", view: 2002 },
    { name: "The Departed", view: 2006 },
    { name: "Terminator 2: Judgment Day", view: 1991 },
    { name: "Back to the Future", view: 1985 },
    { name: "Whiplash", view: 2014 },
    { name: "Gladiator", view: 2000 },
    { name: "Memento", view: 2000 },
    { name: "The Prestige", view: 2006 },
    { name: "The Lion King", view: 1994 },
    { name: "Apocalypse Now", view: 1979 },
    { name: "Alien", view: 1979 },
    { name: "Sunset Boulevard", view: 1950 },
    {
        name:
            "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        view: 1964
    },
    { name: "The Great Dictator", view: 1940 },
    { name: "Cinema Paradiso", view: 1988 },
    { name: "The Lives of Others", view: 2006 },
    { name: "Grave of the Fireflies", view: 1988 },
    { name: "Paths of Glory", view: 1957 },
    { name: "Django Unchained", view: 2012 },
    { name: "The Shining", view: 1980 },
    { name: "WALL·E", view: 2008 },
    { name: "American Beauty", view: 1999 },
    { name: "The Dark Knight Rises", view: 2012 },
    { name: "Princess Mononoke", view: 1997 },
    { name: "Aliens", view: 1986 },
    { name: "Oldboy", view: 2003 },
    { name: "Once Upon a Time in America", view: 1984 },
    { name: "Witness for the Prosecution", view: 1957 },
    { name: "Das Boot", view: 1981 },
    { name: "Citizen Kane", view: 1941 },
    { name: "North by Northwest", view: 1959 },
    { name: "Vertigo", view: 1958 },
    { name: "Star Wars: Episode VI - Return of the Jedi", view: 1983 },
    { name: "Reservoir Dogs", view: 1992 },
    { name: "Braveheart", view: 1995 },
    { name: "M", view: 1931 },
    { name: "Requiem for a Dream", view: 2000 },
    { name: "Amélie", view: 2001 },
    { name: "A Clockwork Orange", view: 1971 },
    { name: "Like Stars on Earth", view: 2007 },
    { name: "Taxi Driver", view: 1976 },
    { name: "Lawrence of Arabia", view: 1962 },
    { name: "Double Indemnity", view: 1944 },
    { name: "Eternal Sunshine of the Spotless Mind", view: 2004 },
    { name: "Amadeus", view: 1984 },
    { name: "To Kill a Mockingbird", view: 1962 },
    { name: "Toy Story 3", view: 2010 },
    { name: "Logan", view: 2017 },
    { name: "Full Metal Jacket", view: 1987 },
    { name: "Dangal", view: 2016 },
    { name: "The Sting", view: 1973 },
    { name: "2001: A Space Odyssey", view: 1968 },
    { name: "Singin' in the Rain", view: 1952 },
    { name: "Toy Story", view: 1995 },
    { name: "Bicycle Thieves", view: 1948 },
    { name: "The Kid", view: 1921 },
    { name: "Inglourious Basterds", view: 2009 },
    { name: "Snatch", view: 2000 },
    { name: "3 Idiots", view: 2009 },
    { name: "Monty Python and the Holy Grail", view: 1975 }
];
