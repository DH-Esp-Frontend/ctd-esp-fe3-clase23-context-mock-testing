import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ComponentA from "dh/components/mocks/def/ComponentA"
import { SubComponentAProps } from "dh/components/mocks/def/SubComponentA";
import { useRouter } from "next/router";

const mockSubComponentAProps = jest.fn();
// Evitar utilizar rutas relativas como "./SubComponentA"
jest.mock("dh/components/mocks/def/SubComponentA", () => jest.fn((props: SubComponentAProps) => {
    // Verificamos el correcto llamado de nuestras props en el SubComponentA
    mockSubComponentAProps(props);

    return <button onClick={() => props.onClick()}>SubComponentA</button>
}));

// Ejemplo de como testear un hook
// jest.mock("next/router");
// const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;  // as any

// mockUseRouter.mockReturnValue({
//     push: mockPush
// } as never);  

// Mock router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
}))



describe('ComponenteA', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    })
    describe('when rendering default', () => {
        it('should render the counter in 0', () => {
            render(<ComponentA />)
            expect(screen.getByText("Counter: 0")).toBeInTheDocument();
        })
        it('should render the subcomponent', () => {
            render(<ComponentA />)
            expect(screen.getByText("SubComponentA")).toBeInTheDocument();
        })
    })
    describe('when clicking subcomponent', () => {
        it('should render the counter in 1', async () => {
            render(<ComponentA />)
            userEvent.click(screen.getByRole("button", {name: 'SubComponentA'}))
            expect(await screen.findByText("Counter: 1")).toBeInTheDocument();
        })
    })
    describe('when clicking navigate', () => {
        it('should go to products', async () => {
            render(<ComponentA />)
            userEvent.click(screen.getByRole("button", {name: 'Navigate'}))
            //
            await waitFor(() => {
                expect(mockPush).toHaveBeenNthCalledWith(1, "/products"); 
            })
        })
    })
})