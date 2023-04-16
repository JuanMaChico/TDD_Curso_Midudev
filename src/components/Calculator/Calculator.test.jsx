import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { evaluate } from 'mathjs';
import { Calculator, operations, numbers, rows, equalSign } from './Calculator';

// Primer test,
describe('Calculator', () => {
	//Limpia la Renderización cada vez
	afterEach(cleanup);

	// testea que se Renderiza
	it('should render', () => {
		render(<Calculator />);
	});

	// testea que exista el titulo
	it('should render title correctly', () => {
		render(<Calculator />);
		//Busca el texto pasado como parámetro
		screen.getByText('Calculator');
	});

	// testea que exista los números
	it('should render numbers', () => {
		render(<Calculator />);
		numbers.forEach((numbers) => {
			screen.getByText(numbers);
		});
	});

	//test de que existan las filas
	it('should render 4 rows', () => {
		render(<Calculator />);
		//nos traemos el elemento por su rol
		const rows = screen.getAllByRole('row');
		//busca que el rows tenga un largo de 4
		expect(rows.length).toBe(4);
	});

	it('should render operations', () => {
		render(<Calculator />);
		operations.forEach((operation) => {
			screen.getByText(operation);
		});
	});

	it('should render equal seen', () => {
		render(<Calculator />);
		screen.getByText(equalSign);
	});

	it('should render an input', () => {
		render(<Calculator />);
		screen.getByRole('textbox');
	});

	it('should user input after clicking a number', () => {
		render(<Calculator />);
		const one = screen.getByText('1');
		fireEvent.click(one);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('1');
	});

	it('should user input after clicking several numbers', () => {
		render(<Calculator />);

		const one = screen.getByText('1');
		fireEvent.click(one);

		const two = screen.getByText('2');
		fireEvent.click(two);

		const three = screen.getByText('3');
		fireEvent.click(three);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('123');
	});

	it('should user input after clicking several numbers and operations', () => {
		render(<Calculator />);

		const one = screen.getByText('1');
		fireEvent.click(one);

		const plus = screen.getByText('+');
		fireEvent.click(plus);
		fireEvent.click(one);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('1+1');
	});

	it('should calculate based on user input and show the calculation', () => {
		render(<Calculator />);

		const one = screen.getByText('1');
		fireEvent.click(one);

		const plus = screen.getByText('+');
		fireEvent.click(plus);

		fireEvent.click(one);

		const equal = screen.getByText(equalSign);
		fireEvent.click(equal);

		const input = screen.getByRole('textbox');
		expect(input.value).toBe('2');
	});
});
