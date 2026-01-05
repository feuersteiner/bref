import type { IconName } from '../icon/types.ts';
import type { Color } from '../types.ts';

interface BaseTextInputProps {
	value: string;
	placeholder?: string;
	disabled?: boolean;
	onChange: (value: string) => void;
	wide?: boolean;
}

export interface TextInputProps extends BaseTextInputProps {
	type?: 'email' | 'password' | 'search' | 'tel' | 'text';
	startIcon?: IconName;
	endIcon?: IconName;
}

export interface AreaTextInputProps extends BaseTextInputProps {
	rows?: number;
	resizable?: boolean;
}

export interface AuthorInputValueProps {
	id: string;
	authorId: string;
	value: string;
}

export interface AuthorMetadataProps {
	id: string;
	name: string;
	color: Color;
}

export interface MultiAuthorTextInputProps extends Omit<
	AreaTextInputProps,
	'onChange' | 'value' | 'resizable'
> {
	authors: AuthorMetadataProps[];
	value: AuthorInputValueProps[];
	onChange: (value: AuthorInputValueProps[]) => void;
}
