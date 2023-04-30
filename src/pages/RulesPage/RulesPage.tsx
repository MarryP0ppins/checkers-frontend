import { rules } from 'constants/rules';

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { ArrowLeftIcon } from 'assets';

import './RulesPage.scss';

const cnRule = cn('rule-page');
export const RulesPage: React.FC = () => {
    const navigate = useNavigate();

    const onReturnButtonClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className={`layout ${cnRule()}`}>
            <div className={cnRule('back-button')}>
                <Button
                    startIcon={<ArrowLeftIcon height={12} width={12} />}
                    color="inherit"
                    size="large"
                    variant="outlined"
                    onClick={onReturnButtonClick}
                >
                    Назад
                </Button>
            </div>
            <div className={cnRule('main-title')}>Правила игры</div>
            <div className={cnRule('rules')}>
                {rules.map((chapter, index) => (
                    <div key={index} className={cnRule('chapter')}>
                        <h1>{chapter.title}</h1>
                        {chapter.abzats.map((text, textIndex) => (
                            <h2 className={cnRule('paragraph')} key={textIndex}>
                                {text}
                            </h2>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
