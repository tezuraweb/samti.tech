import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, resetFormData } from '../redux/actions/actions';
import axios from 'axios';

import IconSprite from '../includes/IconSprite';
import localization from '../../../assets/json/localization.json';

const LeadForm = ({ afterSubmit, currencies, currentLang, selectedCurrency }) => {
    const services = [
        localization[currentLang].webdevTitle,
        localization[currentLang].smmTitle,
        localization[currentLang].seoTitle,
        localization[currentLang].designTitle,
        localization[currentLang].tgTitle,
        localization[currentLang].analyticsTitle
    ];

    const budgets = {
        'dollar': [
            '$500 - $2000',
            '$2000 - $5000',
            '$5000 - $10000',
            '$10000+',
        ],
        'ruble': [
            '₽30000 - ₽100000',
            '₽100000 - ₽300000',
            '₽300000 - ₽1000000',
            '₽1000000+',
        ],
        'yuan': [
            '¥3000 - ¥8000',
            '¥8000 - ¥20000',
            '¥20000 - ¥50000',
            '¥50000+',
        ],
    };

    const initialState = {
        service: 0,
        name: '',
        email: '',
        messengerId: '',
        messengerType: '',
        budget: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const savedFormState = useSelector((state) => state.form.formData);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [usedCurrency, setUsedCurrency] = useState('dollar');

    useEffect(() => {
        setUsedCurrency(currencies[selectedCurrency].name);
    }, [selectedCurrency]);

    useEffect(() => {
        if (savedFormState) {
            setFormData(prevState => ({
                ...prevState,
                ...savedFormState,
                service: typeof savedFormState.service === 'number' ? savedFormState.service : 0
            }));
        }
    }, [savedFormState]);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataSend = {
            ...formData,
            service: services[formData.service]
        }

        axios.post('/api/lead', formDataSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Submission Successful', response.data);
                dispatch(resetFormData());
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setVisible(false);
                    setTimeout(() => {
                        if (afterSubmit) {
                            afterSubmit();
                        }
                    }, 300);
                }, 3000);
            })
            .catch(error => {
                console.error('Submission Error', error);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
            });
    };

    const popupClick = (e) => {
        if (e.target != e.currentTarget) return;
        handleClose();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        dispatch(updateFormData(formData));
        setVisible(false);
        setTimeout(() => {
            if (afterSubmit) {
                afterSubmit();
            }
        }, 300);
    };

    const handlePrev = () => {
        const prevInd = formData.service > 0 ? formData.service - 1 : services.length - 1;
        setFormData(prevState => ({
            ...prevState,
            service: prevInd
        }));
    }

    const handleNext = () => {
        const nextInd = (formData.service + 1) % services.length;
        setFormData(prevState => ({
            ...prevState,
            service: nextInd
        }));
    }

    return (
        <div className={`form__popup ${visible ? 'active' : ''}`} onClick={(e) => popupClick(e)}>
            <div className="form__container">
                <form className="form__wrapper" onSubmit={handleSubmit}>
                    <div className="form__column form__column--first">
                        <div className="form__line">
                            <input
                                className="form__input"
                                type="text"
                                id="formName"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <label className="form__label" htmlFor="formName">{localization[currentLang].formName}</label>
                        </div>

                        <div className="form__line">
                            <input
                                className="form__input"
                                type="email"
                                id="formEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <label className="form__label" htmlFor="formEmail">{localization[currentLang].formEmail}</label>
                        </div>

                        <div className="form__line">
                            <input
                                className="form__input"
                                type="text"
                                id="formMessengerId"
                                name="messengerId"
                                value={formData.messengerId}
                                onChange={handleInputChange}
                            />
                            <label className="form__label" htmlFor="formMessengerId">{localization[currentLang].formMessengerId}</label>
                        </div>

                        <div className="form__line">
                            <div className="form__messengers">
                                <label className="form__radio" htmlFor="formTelegram">
                                    <input
                                        className="form__radio--input"
                                        type="radio"
                                        id="formTelegram"
                                        name="messengerType"
                                        value="telegram"
                                        checked={formData.messengerType === 'telegram'}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form__radio--button">
                                        <IconSprite selector="TelegramRoundIcon" width="30" height="30" />
                                    </div>
                                </label>

                                <label className="form__radio" htmlFor="formLine">
                                    <input
                                        className="form__radio--input"
                                        type="radio"
                                        id="formLine"
                                        name="messengerType"
                                        value="line"
                                        checked={formData.messengerType === 'line'}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form__radio--button">
                                        <IconSprite selector="LineRoundIcon" width="30" height="30" />
                                    </div>
                                </label>

                                <label className="form__radio" htmlFor="formFb">
                                    <input
                                        className="form__radio--input"
                                        type="radio"
                                        id="formFb"
                                        name="messengerType"
                                        value="fbmessenger"
                                        checked={formData.messengerType === 'fbmessenger'}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form__radio--button">
                                        <IconSprite selector="FbRoundIcon" width="30" height="30" />
                                    </div>
                                </label>

                                <label className="form__radio" htmlFor="formWhatsapp">
                                    <input
                                        className="form__radio--input"
                                        type="radio"
                                        id="formWhatsapp"
                                        name="messengerType"
                                        value="whatsapp"
                                        checked={formData.messengerType === 'whatsapp'}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form__radio--button">
                                        <IconSprite selector="WhatsappRoundIcon" width="30" height="30" />
                                    </div>
                                </label>

                                <label className="form__radio" htmlFor="formWechat">
                                    <input
                                        className="form__radio--input"
                                        type="radio"
                                        id="formWechat"
                                        name="messengerType"
                                        value="wechat"
                                        checked={formData.messengerType === 'wechat'}
                                        onChange={handleInputChange}
                                    />
                                    <div className="form__radio--button">
                                        <IconSprite selector="WechatRoundIcon" width="30" height="30" />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="form__line">
                            <select
                                className="form__input"
                                id="formBudget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                            >
                                {budgets[usedCurrency].map((budget) => (
                                    <option value={budget}>{budget}</option>
                                ))}
                            </select>
                            <label className="form__label" htmlFor="formBudget">{localization[currentLang].formBudget}</label>
                        </div>
                        <div className="form__line">
                            <textarea
                                className="form__input"
                                name="description"
                                id="formDesc"
                                cols="30"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                            <label className="form__label form__label--small" htmlFor="formDesc">{localization[currentLang].formDesc}</label>
                        </div>
                    </div>

                    <div className="form__column form__column--second">
                        <button className="form__button form__button--upper button" type="button" onClick={() => handleClose()}>x</button>
                        <div className="form__service">
                            <button className="form__service--prev" type="button" onClick={() => handlePrev()}></button>
                            <div className="form__service--text">{services[formData.service]}</div>
                            <button className="form__service--next" type="button" onClick={() => handleNext()}></button>
                        </div>
                        <button className="form__button form__button--lower button" type="submit">
                            <span className="form__button--desktop">//<br />se<br />nd</span>
                            <span className="form__button--mobile">// send</span>
                        </button>
                    </div>

                    {error && (
                        <div className="form__message form__message--icon">
                            <div className="form__message--fail"></div>
                        </div>
                    )}
                    {success && (
                        <div className="form__message form__message--icon">
                            <div className="form__message--success"></div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LeadForm;
