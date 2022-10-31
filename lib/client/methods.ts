
export const login = async (username:string, password:string, ) => {
    const body = {
      username,
      password,
    };
  
const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  return {
    succesful: res.status === 200,
    user: await res.json()
  };
};

export const saveReview = async (anmeldelseTitle:string ,anmeldelseContent:string, rating:number, productId:number) => {
   const body = {
      anmeldelseTitle,
      anmeldelseContent,
      rating,
      productId
    };
  console.log(body)
const res = await fetch('/api/createReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    ;
  return {
    succesful: res.status === 200,
    user: await res.json()
  };
}