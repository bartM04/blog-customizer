import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isOpen,
	onToggle,
	onClose,
	onApply,
}) => {
	const formRef = useRef<HTMLElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		const resetState = {
			fontFamilyOption: { ...defaultArticleState.fontFamilyOption },
			fontSizeOption: { ...defaultArticleState.fontSizeOption },
			fontColor: { ...defaultArticleState.fontColor },
			backgroundColor: { ...defaultArticleState.backgroundColor },
			contentWidth: { ...defaultArticleState.contentWidth },
		};

		setFormState(resetState);

		onApply(resetState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
					/>

					<RadioGroup
						key={formState.fontSizeOption.value}
						title='РАЗМЕР ШРИФТА'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
					/>

					<Separator />

					<Select
						title='ЦВЕТ ШРИФТА'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
					/>

					<Select
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
					/>

					<Separator />

					<Select
						title='ШИРИНА КОНТЕНТА'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
