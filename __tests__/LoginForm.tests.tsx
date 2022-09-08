import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm, { FormData, loginSchema } from 'dh/components/LoginForm'

describe('LoginForm', () => {
    describe('when rendering default form', () => {
        it('should render the heading', () => {
            render(<LoginForm />)
            const heading = screen.getByRole('heading', {
                name: /login/i,
            })
            expect(heading).toBeInTheDocument()
        })
        it('should render the label & input fields', () => {
            render(<LoginForm />)
            const usernameInput = screen.getByLabelText('Username:')
            const passwordInput = screen.getByLabelText('Password:')
            expect(usernameInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
        });
        it('should render the submit button', () => {
            render(<LoginForm />)
            const submitButton = screen.getByRole('button', {name: /Login/i,})
            expect(submitButton).toBeInTheDocument();
        });
        it('should have focus on username', () => {
            render(<LoginForm />)
            const usernameInput = screen.getByRole('textbox', {name: /Username/i,})
            expect(usernameInput).toHaveFocus();
        });
    })
    describe('when submitting a valid form', () => {
        it('should show success message', async () => {
            render(<LoginForm />)
            const usernameInput = screen.getByRole('textbox', {name: /Username/i,})
            const passwordInput = screen.getByLabelText('Password:')
            const submitButton = screen.getByRole('button', {name: /Login/i,})
            await userEvent.type(usernameInput, 'valid-username');
            await userEvent.type(passwordInput, 'valid-password');
            await userEvent.click(submitButton);
            const success = await screen.findByText('Logged In!');
            expect(success).toBeInTheDocument();
        })  
    })  
    describe('when submitting a invalid form', () => {
        describe('without username', () => {
            it('should show username is required', async () => {
                render(<LoginForm />)
                const passwordInput = screen.getByLabelText('Password:')
                const submitButton = screen.getByRole('button', {name: /Login/i,})
                await userEvent.type(passwordInput, 'valid-password');
                await userEvent.click(submitButton);
                const error = await screen.findByText('Username is required');
                expect(error).toBeInTheDocument();
            })
        })
        describe('without password', () => {
            it('should show password is required', async () => {
                render(<LoginForm />)
                const usernameInput = screen.getByRole('textbox', {name: /Username/i,})
                const submitButton = screen.getByRole('button', {name: /Login/i,})
                await userEvent.type(usernameInput, 'valid-username');
                await userEvent.click(submitButton);
                const error = await screen.findByText('Password is required');
                expect(error).toBeInTheDocument();
            })
        })
        describe('username with less than 3 chars', () => {
            it('should show username shout have at least 3 chars', async () => {
                render(<LoginForm />)
                const usernameInput = screen.getByRole('textbox', {name: /Username/i,})
                const passwordInput = screen.getByLabelText('Password:')
                const submitButton = screen.getByRole('button', {name: /Login/i,})
                await userEvent.type(usernameInput, 'x');
                await userEvent.type(passwordInput, 'valid-password');
                await userEvent.click(submitButton);
                const error = await screen.findByText('Username should have at least 3 chars');
                expect(error).toBeInTheDocument();
            })
        })
    })
    describe('when validating a complete login schema', () => {
        it('should return true', async () => {
            const user: FormData = {
                username: 'valid',
                password: 'valid'
            }
            expect(await loginSchema.isValid(user)).toBeTruthy();
        })
    })
    describe('when validating a schema without username', () => {
        it('should return false', async () => {
            const user: FormData = {
                username: '',
                password: 'valid'
            }
            expect(await loginSchema.validate(user)).toBeFalsy();
        })
    })
})