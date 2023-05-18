import { Request, Response } from 'express';
import { get, post, controller, bodyValidator } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

@controller('/auth')
class LoginController {

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="post" action>
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  };

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;
  
    if (email && password) {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password.')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response):void {
    req.session = undefined;
    res.redirect('/');
  }
}