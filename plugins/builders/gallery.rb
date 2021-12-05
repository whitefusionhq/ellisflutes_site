class Gallery < SiteBuilder
  def build
    hook :galleries, :pre_render do |item|
      item.data.captions = item.content.split(/\n/).select(&:present?)
    end

    liquid_tag :gallery do |gallery_name, _tag|
      gallery = site.collections.galleries.docs.find do |resource|
        resource.data.title&.strip == gallery_name
      end

      next <<~HTML unless gallery
        <p style="text-align:center"><strong>
          [ Can't find gallery: #{gallery_name} ]
        </strong></p>
      HTML

      timeout = gallery.data.cloudinary_ids.size > 1 ? 4500 : 1000 * 6000

      <<~HTML
        <bamboo-slideshow class="post-image" style="margin:2rem -20px; border: 6px solid #f1c363" speed="1500" timeout="#{timeout}">
          <bamboo-slides>
            #{
              gallery.data.cloudinary_ids.map.each_with_index do |image_id, i|
                <<~HTML
                  <bamboo-slide style="background-image:url(#{
                    CloudinaryFilter.cloudinary_url(
                      image_id, "w_2048,h_4000,c_limit,a_exif,q_75"
                    )
                    })">
                    #{
                      if gallery.data.captions[i]
                        <<~HTML
                          <bamboo-caption part="caption">
                            #{ gallery.data.captions[i] }
                          </bamboo-caption>
                        HTML
                      end
                    }
                  </bamboo-slide>
                HTML
              end.join("")
            }
          </bamboo-slides>
        </bamboo-slideshow>
      HTML
    end
  end
end
