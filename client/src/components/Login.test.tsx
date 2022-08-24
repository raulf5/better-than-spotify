import { render,screen } from "@testing-library/react";
import Login from "./Login";

test('should render a button with the text hello world', async ()=>{
    render(<Login/>);
    const loginButton = await screen.getByRole('button');

    expect(loginButton.innerHTML).toContain('Login');
})