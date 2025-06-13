declare namespace User {
  type Personal = {
    full_name: string;
    email: string;
    phone: string;
  };

  type Address = {
    zip_code: string;
    address: string;
    number: string;
    city: string;
    state: string;
  };
  type I = Personal &
    Address & {
      id: number;
      terms_accepted: boolean;
      created_at: Date;
    };
}
