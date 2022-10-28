import { Prisma, PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import { saveReview } from '../../lib/client/methods';
let URL = process.env.NEXT_PUBLIC_URL;

function ShowProduct({
  productID,
}: {
  productID: string | string[] | undefined;
}) {
  const [reviewModel, setReviewModel] = useState<boolean>(false);
  const [product, setProduct] =
    useState<Prisma.ProductsGetPayload<{ include: { Review: true } }>>();
  const [price, setPrice] = useState('');
  const getProduct = useCallback(() => {
    fetch(URL + 'api/products/' + productID)
      .then((res) => {
        if (res.status !== 200) throw res.json();
        return res.json();
      })
      .then(
        (product: Prisma.ProductsGetPayload<{ include: { Review: true } }>) => {
          setProduct(product);
          let enprice = Intl.NumberFormat('no-NO', {
            currency: 'NOK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.price);
          setPrice(enprice + ',-');
          console.log(product.Review);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  async function Handlevogn() {}
  async function createReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (product) {
      console.log('test');
      let res = await saveReview(
        e.currentTarget.anmeldelsetitle.value,
        e.currentTarget.anmeldelseContent.value,
        e.currentTarget.rating.value,
        product.id,
      );
      console.log(res);
      if (res.succesful) {
        reviewModal();
      } else {
        console.log('res.err');
      }
    }
  }
  async function reviewModal() {
    setReviewModel(!reviewModel);
  }
  if (!product) return <div>Loading</div>;
  return (
    <>
      <div className="text-center">
        <div className="w-2/3 inline-block text-center" id="container">
          <div className="text-center items-center">
            <div id="left" className="grid-cols-2  grid">
              <div id="1">
                {product.image && (
                  <Image src={product?.image} alt="" width={450} height={600} />
                )}
              </div>
              <div id="2" className=" m-2 ">
                <div className="bg-slate-200 border p-4">
                  <h1 className="font-bold text-xl">{product?.title}</h1>
                  <h1 className="font-light">{product?.content}</h1>
                  <h1>{price}</h1>
                  <button
                    className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                    type="button"
                    onClick={Handlevogn}
                  >
                    Legg til i handlevogn
                  </button>
                  <h1 className="mt-2">{product.stock} stk. på lager</h1>
                </div>
                <div className="border mt-5 text-center items-center">
                  <div id="top-levering" className="border-b-2 border-gray-400">
                    <h1 className="font-medium">
                      Leveringsalternativer og Priser
                    </h1>
                  </div>
                  <div id="brev" className="border-b-2">
                    <div>0,- Brev</div>
                    <div> estimert leveringstid: 4 dager</div>
                  </div>
                  <div id="Postkasse" className="border-b-2">
                    <div>59,- Postkasse</div>
                    <div> estimert leveringstid: 2 dager</div>
                  </div>
                  <div id="Butikk i nærheten " className="border-b-2">
                    <div>59,- Butikk i nærheten</div>
                    <div> estimert leveringstid: 3 dager</div>
                  </div>
                </div>
              </div>
            </div>
            <div id="anmeldelser" className="border">
              <h1 className="font-medium">Anmeldelser</h1>
              <button
                type="submit"
                className="w-1/2 text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={reviewModal}
              >
                Lag anmeldelse
              </button>
              {product.Review.map((item) => {
                let starsCount = item.rating;
                const StarReview: JSX.Element[] = [];
                for (let i = 1; i <= starsCount; i++) {
                  StarReview.push(
                    <li>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="star"
                        className="w-4 text-yellow-500 mr-1"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        ></path>
                      </svg>
                    </li>,
                  );
                }

                return (
                  <>
                    <div key={item.id} className="border-2 px-4 py-2 m-2">
                      <div id="topReview" className="grid-cols-3  grid">
                        <div className="text-left font-medium">
                          <h1>{item.createdAt.toLocaleString()}</h1>
                        </div>
                        <div className="text-center font-medium">
                          <h1>{item.title}</h1>
                        </div>
                        <div className="text-right">
                          <ul className="flex justify-center">{StarReview}</ul>
                        </div>
                      </div>
                      <h2>{item.content}</h2>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {reviewModel && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          className=" bg-black bg-opacity-25 overflow-y-auto overflow-x-hidden top-0 left-0 z-50 w-full h-full md:inset-0 min-h-screen md:h-full fixed "
          onClick={reviewModal}
        >
          <div
            className="p-4 w-full sm:w-1/3 max-w-wd h-full md:h-auto mx-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={reviewModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  lag anmeldelse
                </h3>
                <form className="space-y-6" onSubmit={createReview}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      tittel
                    </label>
                    <input
                      name="anmeldelsetitle"
                      id="anmeldelsetitle"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Example title"
                    ></input>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Anmeldelse
                    </label>
                    <input
                      name="anmeldelseContent"
                      id="anmeldelseContent"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Techship is the best!"
                    ></input>
                  </div>
                  <div className="text-center items-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Velg rating
                    </label>
                    <select id="rating" name="rating">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div>
                    <ul className="flex justify-center">
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="star"
                          className="w-4 text-yellow-500"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Lag anmeldelse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowProduct;
