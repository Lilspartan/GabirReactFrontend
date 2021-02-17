const Haiku = ({ haiku }) => {
  const id = Math.floor(Math.random() * 100000);
  const toggleId = `target: #${id}`;

  return (
    <>
      <button uk-toggle={toggleId} type="button">{haiku.haikuLines[0]}...</button>
      
      <div id={id} uk-modal>
          <div class="uk-modal-dialog uk-modal-body">
              <h2 class="uk-modal-title">Headline</h2>
              <p>{haiku.haikuLines[0]}</p>
              <p>{haiku.haikuLines[1]}</p>
              <p>{haiku.haikuLines[2]}</p>
              <p class="uk-text-right">
                  <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                  <button class="uk-button uk-button-primary" type="button">Save</button>
              </p>
          </div>
        </div>
    </>
  )
}

export default Haiku