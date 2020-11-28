require "money"

# https://git.io/vM7vw
#I18n.enforce_available_locales = false
Money.locale_backend = :i18n
I18n.locale = :en

Money.default_currency = Money::Currency.new("USD")
Money.rounding_mode = BigDecimal::ROUND_HALF_EVEN

module JekyllMoney
  module Core
    extend self

    def money(value, currency = "USD", options = {})
      @defaults = defaults unless defined?(@defaults)
      @options = @defaults.merge(options)

      value = validate_money!(value, currency)
      format_money(value, currency, options)
    end

    private

    def validate_money!(value, currency)
      Money.new(value, currency)
    end

    def format_money(value, currency = "USD", options = {})
      Money.new(value, currency).format
    end

    # @see http://www.rubydoc.info/gems/money/
    def defaults
      {
        "conversion_precision" => Money.conversion_precision,
        "default_bank" => Money.default_bank,
        "default_currency" => Money.default_currency,
        "default_formatting_rules" => Money.default_formatting_rules,
        "infinite_precision" => Money.infinite_precision,
        "rounding_mode" => Money.rounding_mode,
        "use_i18n" => Money.use_i18n
      }
    end
  end
end

module JekyllMoney
  module Filter
    def money(value, currency = "USD")
      config = @context.registers[:site].config.fetch('jekyll_money', {})
      JekyllMoney::Core.money(value, currency, config)
    end
  end
end

Liquid::Template.register_filter(JekyllMoney::Filter)
