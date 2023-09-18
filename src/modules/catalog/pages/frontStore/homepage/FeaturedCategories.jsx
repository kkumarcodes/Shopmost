import React from 'react';
import Button from '@components/frontStore/cms/Button';

export default function FeaturedCategories() {
  return (
    <div className="mt-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 page-width">
        <div>
          <div className="text-center">
            <img src="/assets/homepage/banner/men-shoes.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Men shoes collection</h3>
          <div className="mb-1">
            <p>
            Discover our exclusive collection of high-quality men's shoes, featuring sophisticated styles to elevate any outfit. Crafted from premium leathers and designed for superior comfort, these shoes are made to last while providing effortless versatility.
            </p>
          </div>
          <Button url="/category/men" title="Shop men" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/homepage/banner/women-shoes.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Women shoes collection</h3>
          <div className="mb-1">
            <p>
            Elevate your look with our exclusive collection of women's shoes, featuring elegant styles crafted from luxurious materials. Whether heading to the office or a night out, these shoes are designed to provide a perfect blend of sophistication, comfort, and versatility.
            </p>
          </div>
          <Button url="/category/women" title="Shop women" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/homepage/banner/kid-shoes.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Kids shoes collection</h3>
          <div className="mb-1">
            <p>
            Make sure your little ones step out in style with our collection of comfortable, durable kids' shoes. From first steps to first days of school, we have the perfect pair for every occasion.
            </p>
          </div>
          <Button url="/category/kids" title="Shop kids" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
