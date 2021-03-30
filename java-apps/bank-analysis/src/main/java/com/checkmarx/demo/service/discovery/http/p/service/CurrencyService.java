package com.checkmarx.demo.service.discovery.http.p.service;

import com.google.common.collect.ImmutableSet;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author Yevgeny Kuznetsov
 * @since 14 December 2020
 **/
@Service
public class CurrencyService {

    private static final Set<ConversionRatio> ratios = ImmutableSet
            .of(new ConversionRatio(Currency.USD, Currency.NIS, 3.25D),
                    new ConversionRatio(Currency.USD, Currency.GBP, 0.73D));

    public double convert(Long amount, Currency sourceCurrency, Currency targetCurrency) {
        ConversionRatio conversionRatio =
                ratios.stream().filter(ratio -> ratio.relevantCurrencies(sourceCurrency, targetCurrency)).findFirst()
                        .orElseThrow(() -> new NoSuchConversionRatioException(sourceCurrency, targetCurrency));
        return conversionRatio.convert(amount, sourceCurrency, targetCurrency);
    }
}
