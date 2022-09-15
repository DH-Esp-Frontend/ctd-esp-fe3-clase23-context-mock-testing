import { render, screen } from "@testing-library/react";
import ProductPage from "dh/pages/productos/[id]";


describe('ProductPage', () => {
    describe('when rendering default page', () => {
        it('should render the heading', () => {
            render(<ProductPage />)
            expect(screen.getByText("Productos")).toBeInTheDocument();
        })
    })
});