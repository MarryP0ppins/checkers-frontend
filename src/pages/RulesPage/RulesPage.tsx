import { rules } from 'constants/rules';

import React from 'react';
import { cn } from '@bem-react/classname';

import { Header } from 'components/Header';

import './RulesPage.scss';

const cnRule = cn('rule-page');
export const RulesPage: React.FC = () => {
    return (
        <div className={cnRule()}>
            <Header />
            <div className={cnRule('scroll')}>
                <div className={cnRule('main-title')}>Правила игры</div>
                <div className={cnRule('rules')}>
                    {rules.map((chapter, index) => {
                        return (
                            <div key={index} className={cnRule('chapter')}>
                                <h1>{chapter.title}</h1>
                                {chapter.abzats.map((text, textIndex) => {
                                    return (
                                        <h2 className={cnRule('paragraph')} key={textIndex}>
                                            {text}
                                        </h2>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
