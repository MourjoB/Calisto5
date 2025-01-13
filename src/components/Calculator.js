"use client"

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const QuoteCalculator = () => {
    const [coffeeType, setCoffeeType] = useState('spray-dried');
    const [blendRatio, setBlendRatio] = useState('100-pure');
    const [quantity, setQuantity] = useState(1);

    // Base costs for each variant
    const baseCosts = {
        'spray-dried': {
            '100-pure': 710,
            '70-30': 560,
            '51-49': 590
        },
        'algo-dried': {
            '100-pure': 740,
            '70-30': 590,
            '51-49': 620
        }
    };

    // Margin tiers
    const marginTiers = [
        { min: 0, max: 10, margin: 0.30 },
        { min: 10, max: 50, margin: 0.27 },
        { min: 50, max: 200, margin: 0.24 },
        { min: 200, max: 500, margin: 0.21 },
        { min: 500, max: 1500, margin: 0.16 },
        { min: 1500, max: 5000, margin: 0.13 },
        { min: 5000, max: 20000, margin: 0.10 },
        { min: 20000, max: Infinity, margin: 0.07 }
    ];

    const getCurrentTier = (qty) => {
        return marginTiers.find(tier => qty > tier.min && qty <= tier.max);
    };

    const calculatePriceWithMargin = (cost, margin) => {
        return cost / (1 - margin);
    };

    const calculateTotal = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        const pricePerKg = calculatePriceWithMargin(baseCost, tier.margin);
        return (pricePerKg * quantity).toFixed(2);
    };

    const getCurrentPrice = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        const tier = getCurrentTier(quantity);
        return calculatePriceWithMargin(baseCost, tier.margin).toFixed(2);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    // Calculate price for each tier for the current selection
    const getTierPrices = () => {
        const baseCost = baseCosts[coffeeType][blendRatio];
        return marginTiers.map(tier => ({
            ...tier,
            price: calculatePriceWithMargin(baseCost, tier.margin).toFixed(2)
        }));
    };

    return (
        <div id="calculator" style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', overflow: 'hidden' }}>
                    {/* Header Section */}
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '700', color: '#4f46e5' }}>
                            <Calculator style={{ width: '2rem', height: '2rem' }} />
                            Quick Quote Calculator
                        </h2>
                        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>Get an instant price estimate for your wholesale coffee order</p>
                    </div>

                    {/* Calculator Form */}
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                            {/* Coffee Type Selection */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Coffee Type</label>
                                <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb', color: '#1f2937' }}>
                                    <option value="spray-dried">Spray Dried</option>
                                    <option value="algo-dried">Algo Dried</option>
                                </select>
                            </div>

                            {/* Blend Ratio Selection */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Blend Ratio</label>
                                <select value={blendRatio} onChange={(e) => setBlendRatio(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb', color: '#1f2937' }}>
                                    <option value="100-pure">100% Pure</option>
                                    <option value="70-30">70:30 Blend</option>
                                    <option value="51-49">51:49 Blend</option>
                                </select>
                            </div>

                            {/* Quantity Input */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Quantity (Kgs)</label>
                                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb', color: '#1f2937' }} />
                            </div>
                        </div>
                        


                        {/* Price Display */}
                        <div style={{ background: 'linear-gradient(to right, #eef2ff, #e0e7ff)', borderRadius: '0.75rem', padding: '1.5rem', margin: '2rem 0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ flex: '1', fontSize: '1rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>Estimated Total</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>₹{getCurrentPrice()} per kg × {quantity} kg</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '2.25rem', fontWeight: '700', color: '#4f46e5' }}>₹{calculateTotal()}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>INR</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button style={{ flex: '1', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontSize: '1.125rem', fontWeight: '600', backgroundColor: '#4f46e5', color: 'white', border: 'none', transition: 'all 0.2s' }}>
                                Request Custom Quote
                            </button>
                            <button style={{ flex: '1', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontSize: '1.125rem', fontWeight: '600', backgroundColor: 'white', color: '#4f46e5', border: '2px solid #4f46e5', transition: 'all 0.2s' }}>
                                Save Estimate
                            </button>
                        </div>


                        {/* Price Tiers Info */}
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Price Tiers:</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.75rem' }}>
                        {getTierPrices().map((tier, index) => (
                            <div key={tier.min} 
                                style={{ 
                                    padding: '0.5rem', 
                                    borderRadius: '0.5rem', 
                                    backgroundColor: index % 2 === 0 ? '#e0f2fe' : '#f0f9ff', 
                                    color: '#0369a1', 
                                    fontWeight: '600', 
                                    textAlign: 'center', 
                                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' 
                                }}>
                                {tier.min + 1}-{tier.max === Infinity ? '20000+' : tier.max} kg: 
                                <span style={{ display: 'block', fontSize: '0.875rem', color: '#075985', fontWeight: '700' }}>
                                    ₹{tier.price}/kg
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
                    
    );
};

export default QuoteCalculator;
