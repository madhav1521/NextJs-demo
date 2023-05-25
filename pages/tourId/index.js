import React, { useState } from 'react'
import useHook from '../Components/useHook';

export default function tourId(props) {

    const {
        value: enterName,
        isValid: nameIsValid,
        hasError:nameInputHasError,
        inputChangeHandler:nameChangeHandler,
        inputBlurHandler:nameBlurHandler,
        reset:resetNameInput
    } = useHook(value => value.trim().length < 3 || value.trim().length > 20 && value.trim() === '');
    
    const {
        value: enterEmail,
        isValid: emailIsValid,
        hasError:emailInputHasError,
        inputChangeHandler:emailChangeHandler,
        inputBlurHandler:emailBlurHandler,
        reset:resetEmailInput
    } = useHook(value => !value.includes('@'));

    const {
        value: enterAge,
        isValid: ageIsValid,
        hasError:ageInputHasError,
        inputChangeHandler:ageChangeHandler,
        inputBlurHandler:ageBlurHandler,
        reset:resetAgeInput
    } = useHook(value => value < 1 || value > 100);

    let totalForms = false;
    if (!nameIsValid && !emailIsValid && !ageIsValid) {
        totalForms = true;
    };
    
    const submitHandler = e => {
        e.preventDefault();
        console.log('clicked')
        if (!nameIsValid && emailIsValid && ageIsValid) {
            return;
        }
        resetNameInput();
        resetEmailInput();
        resetAgeInput();
    };

    const invalidInputName = nameInputHasError ? 'form invalid' : 'form';
    const invalidInputEmail = emailInputHasError ? 'form invalid' : 'form ';
    const invalidInputAge = ageInputHasError ? 'form invalid' : 'form ';

    return (
        <div className='form-controls'>
            <form onSubmit={submitHandler}>
                <div className={invalidInputName} >
                    <label htmlFor='name'>Enter City Name </label>
                    <input value={enterName} className='input-field' onBlur={nameBlurHandler} onChange={nameChangeHandler} type='text' id='name' name='name' />
                    {nameInputHasError && <p>It must have words between 3 and 20 and can't be empty</p>}
                </div>

                <div className={invalidInputEmail} >
                    <label htmlFor='email'>Enter your Experience </label>
                    <input value={enterEmail} className='input-field' onBlur={emailBlurHandler} onChange={emailChangeHandler} type='email' id='email' name='E-mail' />
                    {emailInputHasError && <p>Please enter valid Email</p>}
                </div>

                <div className={invalidInputAge} >
                    <label htmlFor='age'>Enter your Age: </label>
                    <input value={enterAge} className='input-field' onBlur={ageBlurHandler} onChange={ageChangeHandler} type='number' id='age' name='age' />
                    {ageInputHasError && <p>Please enter valid age between 1 to 100</p>}
                </div>

                <button disabled={!totalForms} className='submit-btn' type='submit'  >Submit</button>
            </form>
        </div>
    )
}

