package com.checkmarx.demo.service.discovery.http.p.service;

import lombok.Value;

/**
 * @author Yevgeny Kuznetsov
 * @since 14 December 2020
 **/
@Value
public class ConversionRatio {

    Currency source;

    Currency target;

    /**
     * Ratio between {@code source} currency and {@code target} currency:
     * <pre>
     * target = source * ratio
     * source = target / ratio
     * </pre>
     */
    double ratio;

    public boolean relevantCurrencies(Currency firstCurrency, Currency secondCurrency) {
        return (firstCurrency == source && secondCurrency == target) ||
                firstCurrency == target && secondCurrency == source;
    }

    public double convert(long amount, Currency source, Currency target) {
        if (!relevantCurrencies(source, target)) {
            throw new NoSuchConversionRatioException(source, target);
        }
        if (source == this.source) {
            return sourceToTarget(amount);
        }
        return targetToSource(amount);
    }

    private double sourceToTarget(long sourceAmount) {
        return Math.round(sourceAmount * ratio * 100.0) / 100.0;
    }

    private double targetToSource(long targetAmount) {
        return Math.round(targetAmount / ratio * 100.0) / 100.0;
    }
}
