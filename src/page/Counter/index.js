import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from './counterSlice';
import slideApi from '~/api/slide';

import styles from './Counter.module.css';
import { Button } from '@mui/material';

export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    //get All api
    useEffect(() => {
        const fetchSlideList = async () => {
            try {
                const response = await slideApi.getAll();
                console.log('Data after feth: ', response);
            } catch (error) {}
        };

        fetchSlideList();
    }, []);

    return (
        <div>
             <Button variant="contained">Hello World</Button>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
                >
                    Add Async
                </button>
            </div>
        </div>
    );
}
