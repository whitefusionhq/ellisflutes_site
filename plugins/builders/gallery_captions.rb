class GalleryCaptions < SiteBuilder
  def build
    hook :galleries, :pre_render do |item|
      item.data.captions = item.content.split(/\n/).select(&:present?)
    end
  end
end
