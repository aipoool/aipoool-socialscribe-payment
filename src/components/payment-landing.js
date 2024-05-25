import React from 'react'
import './landing.css'; 
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';

const paymentlanding = () => {
    async function makePayment(plan) {
        const stripe = await loadStripe('pk_test_51NkpdNSGYG2CnOjscEUK9B0JfqNSzZEqj1GXLZEHPJrzCGPfTDv2DnleEid0HVNvmlf0qUVjNFTRV3UzpAsucioU00Kthd5o4Z');
        let planPay, price; 
        if(plan === 'free') {
            console.log("Processing free plan");
            // Add your logic for processing free plan
        } else if(plan === 'premium') {
            console.log("Processing premium plan");
            planPay= 'SocialScribe Premium Plan';
            price= 1;
  
        } else if(plan === 'pro') {
            console.log("Processing pro plan");
            
            planPay= 'SocialScribe Pro Plan';
            price= 2;
 
        } else {
            console.log("Invalid plan");
        }

        const response = await axios.post(
            "http://localhost:1997/api/create-checkout-session",
            {
              data: {
                plan: planPay,
                price: price
              },
            },
            { withCredentials: true }
          );

          console.log(response);
          console.log(response.data.id); 
          
        const result = stripe.redirectToCheckout({
            sessionId: response.data.id
        });

        if(result.error){
            console.log(result.error); 
        }
    }

  return (
    <div class="container snipcss-iaZTI">
    <h5 class="text-center pricing-table-subtitle">PRICING PLAN</h5>
    <h1 class="text-center pricing-table-title">Pricing Table</h1>
    <div class="row">
        <div class="col-md-4">
            <div class="card pricing-card pricing-plan-basic">
                <div class="card-body">
                    <i class="mdi mdi-cube-outline pricing-plan-icon"></i>
                    <p class="pricing-plan-title">Basic</p>
                    <h3 class="pricing-plan-cost ml-auto">FREE</h3>
                    <ul class="pricing-plan-features">
                        <li>Unlimited conferences</li>
                        <li>100 participants max</li>
                        <li>Custom Hold Music</li>
                        <li>10 participants max</li>
                    </ul>
                    <button class="btn pricing-plan-purchase-btn" onClick={() => makePayment('free')}>Free</button>
                    
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card pricing-card pricing-card-highlighted  pricing-plan-pro">
                <div class="card-body">
                    <i class="mdi mdi-trophy pricing-plan-icon"></i>
                    <p class="pricing-plan-title">Pro</p>
                    <h3 class="pricing-plan-cost ml-auto">$49</h3>
                    <ul class="pricing-plan-features">
                        <li>Unlimited conferences</li>
                        <li>100 participants max</li>
                        <li>Custom Hold Music</li>
                        <li>10 participants max</li>
                    </ul>
                    <button class="btn pricing-plan-purchase-btn" onClick={() => makePayment('premium')}>Premium</button>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card pricing-card pricing-plan-enterprise">
                <div class="card-body">
                    <i class="mdi mdi-wallet-giftcard pricing-plan-icon"></i>
                    <p class="pricing-plan-title">Enterprise</p>
                    <h3 class="pricing-plan-cost ml-auto">$69</h3>
                    <ul class="pricing-plan-features">
                        <li>Unlimited conferences</li>
                        <li>100 participants max</li>
                        <li>Custom Hold Music</li>
                        <li>10 participants max</li>
                    </ul>
                    <button class="btn pricing-plan-purchase-btn" onClick={() => makePayment('pro')}>Pro</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default paymentlanding;
