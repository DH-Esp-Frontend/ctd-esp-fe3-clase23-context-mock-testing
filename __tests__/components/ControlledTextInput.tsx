import { render, screen } from "@testing-library/react"
import ControlledTextInput from "dh/components/ControlledTextInput"
import { renderWithReactHookForm } from "../../utils/testing.helpers"

describe('ControlledTextInput', () => {
    describe('when rendering default', () => {
        it('should render a textbox', () => {
            renderWithReactHookForm(<ControlledTextInput name="firstname" label="Firstname" />);
            const textbox = screen.getByRole('textbox', {'name': 'Firstname'})
            expect(textbox).toBeInTheDocument();
            expect(textbox).toHaveValue('');
        })
        it('should render the default value', () => {
            renderWithReactHookForm(
                <ControlledTextInput name="firstname" label="Firstname" />,
                {defaultValues: {'firstname': 'TestUser'}}
            );
            const textbox = screen.getByRole('textbox', {'name': 'Firstname'})
            expect(textbox).toHaveValue('TestUser');
        })
    })
})