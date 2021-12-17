require "money"

Money.locale_backend = :i18n
Money.rounding_mode = BigDecimal::ROUND_HALF_EVEN

  module Builders
  end

class Builders::Money < SiteBuilder
  def build
    liquid_filter :money, :money
    helper :money, :money
  end

  # Currency options like USD, EUR, GBP…
  def money(input, currency = "USD")
    Money.new(input ? input * 100 : 0, currency).format
  end
end
